import Pusher from 'pusher-js'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getDraftList, startDraft } from 'utils/api/draft'
import { findDraft } from 'utils/api/game'

const { VITE_PUSHER_CLIENT_KEY } = import.meta.env

if (!VITE_PUSHER_CLIENT_KEY) {
    console.log('PUSHER KEY NOT AVAILABLE')
}

export default (draft_id: number) => {
    const draftQuery = useQuery(`draft${draft_id}`, () => findDraft(draft_id))
    const draftListQuery = useQuery('draftlist', getDraftList)

    const [listView, setListView] = useState<'SEASON' | 'FIVE'>('SEASON')
    const [catView, setCatView] = useState<keyof PlayerForDraftListAvgs>('FantasyPoints')

    interface UserForGameGame {
        numberOfTeamsToSimul: number
        draft_interval_time: number
        game_id: number
        status: string
        gameType: string
    }

    const [draft, setDraft] = useState<DraftInformationType>({
        draft_id: 0,
        userforgame_id: 0,
        all_picks: [],
        picks: [],
        current_pick: 0,
        draft_ended: null,
        draft_started: null,
        is_player_turn: false,
        pick_numbers: [],
        pick_position: 0,
        status: 'NO_GAME',
        time_till_next_pick: null,
        userforgame: {
            game_id: 0,
            joined_at: '',
            user_id: 0,
            userforgame_id: 0,
            game: {
                numberOfTeamsToSimul: 0,
                draft_interval_time: 0,
                game_id: 0,
                status: '',
                gameType: '',
            },
        },
    })
    const [loaded, setLoaded] = useState(false)
    const [filteredDraftList, setFilteredDraftList] = useState<PlayerForDraftList[]>([])
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerForDraftList>()

    const setSelectedDraftedPlayer = (PlayerID: number) => {
        const player = draftListQuery.data?.find((element) => element.last_five_averages.PlayerID === PlayerID)
        if (player) {
            setSelectedPlayer(player)
        }
    }

    const startDraftHelper = async (draft_id: number) => {
        const response = await startDraft(draft_id)
        // if (response) {
        //     setDraft({ ...draft, draft_started: true })
        // }
    }

    useEffect(() => {
        const mappedIds = draft.all_picks.map((p) => p.PlayerID)
        const list = filteredDraftList.filter((element) => {
            if (mappedIds.includes(element.last_five_averages.PlayerID)) {
                return false
            } else {
                return true
            }
        })
        setFilteredDraftList(list)
    }, [draft.all_picks])

    useEffect(() => {
        const slicedView = filteredDraftList.slice()
        if (listView === 'SEASON') {
            slicedView.sort((a, b) => {
                //@ts-ignore
                return parseFloat(b.season_averages[catView]) - parseFloat(a.season_averages[catView])
            })
        } else {
            slicedView.sort((a, b) => {
                //@ts-ignore
                return parseFloat(b.last_five_averages[catView]) - parseFloat(a.last_five_averages[catView])
            })
        }

        setFilteredDraftList(slicedView)
    }, [catView, listView])

    useEffect(() => {
        Pusher.logToConsole = true
        const pusher = new Pusher(VITE_PUSHER_CLIENT_KEY, {
            cluster: 'us2',
        })
        const channel = pusher.subscribe(`draft_${draft_id}`)
        channel.bind(
            'draft_init',
            ({
                is_player_turn,
                time_till_next_pick,
                current_pick,
                draft_started,
            }: {
                is_player_turn: boolean
                time_till_next_pick: null | string
                current_pick: number
                draft_started: string
            }) => {
                setDraft((d) => ({ ...d, time_till_next_pick, current_pick, is_player_turn, draft_started }))
            }
        )

        interface DraftPickWs {
            is_player_turn: boolean
            time_till_next_pick: null | string
            current_pick: number
            picked_player: DraftPick
        }
        channel.bind(
            'draft_player_pick',
            ({ is_player_turn, time_till_next_pick, current_pick, picked_player }: DraftPickWs) => {
                setDraft((d) => ({
                    ...d,
                    all_picks: [...d.all_picks, picked_player],
                    picks: [...d.picks, picked_player],
                    current_pick,
                    time_till_next_pick,
                    is_player_turn,
                }))
            }
        )

        channel.bind(
            'draft_computer_pick',
            ({ is_player_turn, time_till_next_pick, current_pick, picked_player }: DraftPickWs) => {
                setDraft((d) => ({
                    ...d,
                    all_picks: [...d.all_picks, picked_player],
                    current_pick,
                    time_till_next_pick,
                    is_player_turn,
                }))
            }
        )

        channel.bind('draft_ended', ({ status, draft_ended }: { status: string; draft_ended: string }) => {
            setDraft((d) => ({
                ...d,
                status,
                draft_ended,
            }))
        })

        return () => {
            channel.unsubscribe()
            pusher.unsubscribe(`draft_${draft_id}`)
        }
    }, [])

    useEffect(() => {
        if (draftQuery.data) {
            setDraft(draftQuery.data)
            setLoaded(true)
        }
    }, [draftQuery.data])

    useEffect(() => {
        if (draftListQuery.data) {
            console.log(draftListQuery.data)
            const mappedIds = draft.all_picks.map((p) => p.PlayerID)

            const list = draftListQuery.data.filter((element) => {
                if (mappedIds.includes(element.last_five_averages.PlayerID)) {
                    return false
                } else {
                    return true
                }
            })

            setFilteredDraftList(list)
            if (!selectedPlayer) {
                setSelectedPlayer(draftListQuery.data[0])
            }
        }
    }, [draftListQuery.data])

    // const gameQuery = useQuery(`fantasyGame${gameId}`, () => findGame(gameId), { refetchOnWindowFocus: false })
    return [
        draft,
        loaded,
        filteredDraftList,
        selectedPlayer,
        setSelectedPlayer,
        listView,
        setListView,
        catView,
        setCatView,
        setSelectedDraftedPlayer,
        startDraftHelper,
    ] as const
}

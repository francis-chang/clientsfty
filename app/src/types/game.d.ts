interface GameDetailsWrapper {
    game: GameDetails
    userforgame_id: number
}

interface PlayersForGameDetails {
    draft: {
        draft_id: number
        userforgame_id: number
    } | null
    game_id: number
    joined_at: string
    user_id: number
    userforgame_id: number
    user: { profile_icon: string; profile_icon_color: string; user_id: number; username: string }
}

interface GameDetails {
    commissioner_id: number
    draftFormat: 'AI_DRAFT' | 'LIVE_DRAFT'
    game_id: number
    name: String
    numGames: number
    numberOfTeamsToSimul: number
    players: PlayersForGameDetails[]
    status: 'INGAME' | 'LOBBY'
    draftIntervalInformation: null | { date_started: string; draft_interval_end: string }
}

type Cats = 'PTS' | 'REB' | 'AST' | 'STL' | 'BLK' | 'TOS' | 'FGP' | 'FTP' | 'TPP' | 'FAN' | 'TPM'

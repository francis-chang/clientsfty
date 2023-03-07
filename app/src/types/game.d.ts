interface GameDetailsWrapper {
    game: GameDetails
    userforgame_id: number
}

interface DraftPick {
    s_name: string
    TotalFantasyPoints: number
    PlayerID: number
    info: string
}

interface UserForGameType {
    game_id: number
    joined_at: string
    user_id: number
    userforgame_id: number
    game: UserForGameGame
}

interface UserForGameGame {
    numberOfTeamsToSimul: number
    draft_interval_time: number
    game_id: number
    status: string
    gameType: string
}

interface DraftInformationTypeWithoutUserforgame {
    draft_id: number
    userforgame_id: number

    all_picks: DraftPick[]
    picks: DraftPick[]
    current_pick: number
    draft_ended: string | null
    draft_started: string | null
    is_player_turn: boolean
    pick_numbers: number[]
    pick_position: number
    status: string
    time_till_next_pick: null | string
}

interface DraftInformationType {
    draft_id: number
    userforgame_id: number
    userforgame: UserForGameType
    all_picks: DraftPick[]
    picks: DraftPick[]
    current_pick: number
    draft_ended: string | null
    draft_started: string | null
    is_player_turn: boolean
    pick_numbers: number[]
    pick_position: number
    status: string
    time_till_next_pick: null | string
}

interface PlayersForGameDetails {
    draft: DraftInformationType | null
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
    draftIntervalInformation: null | DraftIntervalInformation
}

interface DraftIntervalInformation {
    date_started: string
    first_game: DraftIntervalInformationGame
    last_game: DraftIntervalInformationGame
    game_start: string
}

interface DraftIntervalInformationGame {
    GameID: number
    DateTime: string
    away_team: {
        Key: string
        City: string
        Name: string
    }
    home_team: {
        Key: string
        City: string
        Name: string
    }
}

type Cats = 'PTS' | 'REB' | 'AST' | 'STL' | 'BLK' | 'TOS' | 'FGP' | 'FTP' | 'TPP' | 'FAN' | 'TPM'

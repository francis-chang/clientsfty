interface GameDetailsWrapper {
    game: GameDetails
    userforgame_id: number
}

interface DraftInformationType {
    draft_id: number
    userforgame_id: number
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

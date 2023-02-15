interface MockDraftPlayer {
    PlayerID: number
    Points: number
    Rebounds: number
    Assists: number
    Steals: number
    BlockedShots: number
    Turnovers: number
    FantasyPoints: number
    player: {
        FirstName: string
        LastName: string
        s_name: string
        Jersey: number
        team: {
            City: string
            Name: string
            inner_color: string
            outer_color: string
            TeamID: number
        }
    }
}

interface Totals {
    Points: number
    Rebounds: number
    Assists: number
    Steals: number
    BlockedShots: number
    FieldGoalsMade: number
    FieldGoalsAttempted: number
    fgp: number
    FreeThrowsMade: number
    FreeThrowsAttempted: number
    ftp: number
    ThreePointersMade: number
    Turnovers: number
}

interface Rankings {
    Points: number
    Rebounds: number
    Assists: number
    Steals: number
    BlockedShots: number
    fgp: number
    ftp: number
    ThreePointersMade: number
    Turnovers: number
    total: number
}

type TeamElement = {
    name: string
    team: FilteredDraftedPlayer[]
    totals: Totals
    rankings: Rankings
}

type Statline = {
    StatID: number
    Points: number
    Rebounds: number
    Assists: number
    Steals: number
    BlockedShots: number
    Turnovers: number
    FieldGoalsMade: number
    FieldGoalsAttempted: number
    FreeThrowsAttempted: number
    FreeThrowsMade: number
    ThreePointersMade: number
    game: {
        nba_day: string
        formattedDate: string
    }
    opponent_team: {
        City: string
        Name: string
        Key: string
    }
    player: {
        Jersey: number
    }
    team: {
        inner_color: string
        outer_color: string
    }
}

type FilteredDraftedPlayer = {
    PlayerID: number
    name: string
    score: number
    n: number
    pickedAt: number
    pickedString: string
    statlines: Statline[]
}

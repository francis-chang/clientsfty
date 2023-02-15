interface PlayerForDraftListAvgs {
    PlayerID: number
    FantasyPoints: string
    Minutes: number
    FieldGoalsMade: string
    FieldGoalsAttempted: string
    FieldGoalsPercentage: string
    TwoPointersMade: string
    TwoPointersAttempted: string
    TwoPointersPercentage: string
    ThreePointersMade: string
    ThreePointersAttempted: string
    ThreePointersPercentage: string
    FreeThrowsMade: string
    FreeThrowsAttempted: string
    FreeThrowsPercentage: string
    OffensiveRebounds: string
    DefensiveRebounds: string
    Rebounds: string
    Assists: string
    Steals: string
    BlockedShots: string
    Turnovers: string
    PersonalFouls: string
    Points: string
    FantasyPointsFanDuel: string
    FantasyPointsDraftKings: string
    FantasyPointsYahoo: string
    PlusMinus: string
    pct: string
}

interface PlayerForDraftList {
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
    season_averages: PlayerForDraftListAvgs
    last_five_averages: PlayerForDraftListAvgs
}

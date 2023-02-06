// "date": "2023-Jan-30",
// "games": [
//     {
//         "GameID": 18928,
//         "Status": "Scheduled",
//         "DateTime": "2023-01-31T01:00:00.000Z",
//         "AwayTeamScore": null,
//         "HomeTeamScore": null,
//         "Quarter": null,
//         "TimeRemainingMinutes": null,
//         "TimeRemainingSeconds": null,
//         "away_team": {
//             "Key": "GS"
//         },
//         "home_team": {
//             "Key": "OKC"
//         }
//     },

type GameStatsJustScores = {
    date: string
    games: GameStatForBoxScore[]
}

type GameStatForBoxScore = {
    GameID: number
    Status: string
    stadium: string
    DateTime: string
    AwayTeamScore: null | string
    HomeTeamScore: null | string
    Quarter: null | string
    TimeRemainingMinutes: null | string
    TimeRemainingSeconds: null | string
    away_team: {
        Key: string
    }
    home_team: {
        Key: string
    }
}

type StatlineForHome = {
    StatID: number
    PlayerID: number
    team: {
        City: string
        Name: string
        inner_color: string
        outer_color: string
    }
    Name: string
    player: {
        Jersey: number
        s_name: string
    }
    opponent_team: {
        Key: string
    }
    game: {
        nba_day: string
    }
    FantasyPoints: string
    FieldGoalsMade: number
    FieldGoalsAttempted: number
    FieldGoalsPercentage: string
    ThreePointersMade: number
    ThreePointersAttempted: number
    ThreePointersPercentage: string
    FreeThrowsMade: number
    FreeThrowsAttempted: number
    FreeThrowsPercentage: string
    Rebounds: number
    Assists: number
    Steals: number
    BlockedShots: number
    Points: number
}

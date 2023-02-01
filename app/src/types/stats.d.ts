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

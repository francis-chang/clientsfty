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

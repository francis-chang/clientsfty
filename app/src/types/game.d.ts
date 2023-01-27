interface GameInterface {
    commissioner_id: number
    draftFormat: 'AI_DRAFT' | 'LIVE_DRAFT'
    game_id: number
    name: String
    numGames: number
    numberOfTeamsToSimul: number
}

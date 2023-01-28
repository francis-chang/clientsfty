interface GameInterface {
    commissioner_id: number
    draftFormat: 'AI_DRAFT' | 'LIVE_DRAFT'
    game_id: number
    name: String
    numGames: number
    numberOfTeamsToSimul: number
}

type Cats = 'PTS' | 'REB' | 'AST' | 'STL' | 'BLK' | 'TOS' | 'FGP' | 'FTP' | 'TPP' | 'FAN' | 'TPM'

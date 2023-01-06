export type NFLPlayerDataWeek = {
    title: string
    players: { name: string; outer_color: string; inner_color: string; number: number; key: number; team: string }[]
}

export const weekOneData = {
    title: 'Week 1',
    players: [
        {
            name: 'Patrick Mahomes',
            team: 'Kansas City Chiefs',
            outer_color: '#E31837',
            inner_color: 'white',
            number: 15,
            key: 1,
        },
        {
            name: 'Josh Jacobs',
            team: 'Las Vegas Raiders',
            outer_color: '#000',
            inner_color: '#A5ACAF',
            number: 28,
            key: 2,
        },
        {
            name: 'Justin Jefferson',
            team: 'Minnesota Vikings',
            outer_color: '#4F2683',
            inner_color: 'white',
            number: 18,
            key: 3,
        },
        {
            name: 'Deandre Hopkins',
            team: 'Arizona Cardinals',
            outer_color: '#97233F',
            inner_color: 'white',
            number: 10,
            key: 4,
        },
    ],
}

export const weekFourData = {
    title: 'Week 4',
    players: [
        {
            name: 'Jared Goff',
            team: 'Detroit Lions',
            outer_color: '#0076B6',
            inner_color: '#B0B7BC',
            number: 16,
            key: 5,
        },
        {
            name: 'Austin Ekeler',
            team: 'Los Angeles Chargers',
            outer_color: '#0080C6',
            inner_color: 'white',
            number: 30,
            key: 6,
        },
        {
            name: 'Breece Hall',
            team: 'New York Jets',
            outer_color: '#125740',
            inner_color: 'white',
            number: 20,
            key: 7,
        },
        {
            name: 'Tyreek Hill',
            team: 'Miami Dolphins',
            outer_color: '#008E97',
            inner_color: 'white',
            number: 10,
            key: 8,
        },
    ],
}

export const weekEightData = {
    title: 'Week 8',
    players: [
        {
            name: 'Joe Burrow',
            team: 'Cincinnati Bengals',
            outer_color: '#000000',
            inner_color: '#FB4F14',
            number: 9,
            key: 9,
        },
        {
            name: 'Derrick Henry',
            team: 'Tennessee Titans',
            outer_color: '#0C2340',
            inner_color: '#4B92DB',
            number: 22,
            key: 10,
        },
        {
            name: 'Najee Harris',
            team: 'Pittsburg Steelers',
            outer_color: '#101820',
            inner_color: '#FFB612',
            number: 22,
            key: 11,
        },
        {
            name: 'Jaylen Waddle',
            team: 'Miami Dolphins',
            outer_color: '#008E97',
            inner_color: 'white',
            number: 17,
            key: 12,
        },
    ],
}

export const weekTwelveData = {
    title: 'Week 12',
    players: [
        {
            name: 'Jalen Hurts',
            team: 'Philadelphia Eagles',
            outer_color: '#004C54',
            inner_color: 'white',
            number: 1,
            key: 13,
        },
        {
            name: 'Jonathan Taylor',
            team: 'Indianapolis Colts ',
            outer_color: '#002C5F',
            inner_color: '#A5ACAF',
            number: 16,
            key: 14,
        },
        {
            name: 'Tyler Lockett',
            team: 'Seattle Seahawks',
            outer_color: '#002244',
            inner_color: '#69BE28',
            number: 18,
            key: 15,
        },
        {
            name: 'CeeDee Lamb',
            team: 'Dallas Cowboys',
            outer_color: '#041E42',
            inner_color: 'white',
            number: 88,
            key: 16,
        },
    ],
}

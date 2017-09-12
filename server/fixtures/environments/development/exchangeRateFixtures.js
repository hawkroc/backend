import { Meteor } from 'meteor/meteor'

export default {
    generate: () => {
        let fixtures = [
            {
                bitCoin: 'ETH',
                fiatCurrency: 'USD',
                latestDate: 0,
                // this hard code only for test before synchronize currency from api
                hisCurrency: []
            },
            {
                bitCoin: 'BTC',
                fiatCurrency: 'USD',
                latestDate: 0,
                // this hard code only for test before synchronize currency from api
                hisCurrency: []
            }
        ]

        return fixtures
    }
}
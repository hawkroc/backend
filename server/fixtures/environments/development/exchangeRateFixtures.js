

export default {
	generate: () => {
		let fixtures = [
			{
				digitalCurrency: 'ETH',
				fiatCurrency: 'USD',
				latestMinedDate: 0,
				// this hard code only for test before synchronize currency from api
				rates: [ {
					'time': '2017-09-03 00:00:00',
					'open': 352.38,
					'volume': 474351.57165957,
					'high': 371.38,
					'average': 352.35,
					'low': 339.53
				},
				{
					'time': '2017-09-02 00:00:00',
					'open': 391.20,
					'volume': 932878.41052378,
					'high': 392.37,
					'average': 360.42,
					'low': 329.81
				},
				{
					'time': '2017-09-01 00:00:00',
					'open': 388.62,
					'volume': 422980.38237837,
					'high': 395.29,
					'average': 392.24,
					'low': 387.74
				},
				{
					'time': '2017-08-31 00:00:00',
					'open': 383.80,
					'volume': 364944.93367213,
					'high': 389.83,
					'average': 385.53,
					'low': 380.74
				},
				{
					'time': '2017-08-30 00:00:00',
					'open': 372.04,
					'volume': 565192.00746302,
					'high': 390.05,
					'average': 379.65,
					'low': 367.60
				},
				{
					'time': '2017-08-29 00:00:00',
					'open': 347.68,
					'volume': 586027.29686727,
					'high': 374.90,
					'average': 360.77,
					'low': 347.68
				},
				{
					'time': '2017-08-28 00:00:00',
					'open': 347.92,
					'volume': 392176.46916394,
					'high': 349.97,
					'average': 343.55,
					'low': 336.38
				},
				{
					'time': '2017-08-27 00:00:00',
					'open': 332.77,
					'volume': 275313.68714527,
					'high': 347.92,
					'average': 336.50,
					'low': 332.77
				},
				{
					'time': '2017-08-26 00:00:00',
					'open': 330.52,
					'volume': 168866.54273018,
					'high': 335.00,
					'average': 330.21,
					'low': 326.09
				}]
			},
			{
				digitalCurrency: 'BTC',
				fiatCurrency: 'USD',
				latestMinedDate: 0,
				// this hard code only for test before synchronize currency from api
				rates: [ {
					'time': '2017-09-02 00:00:00',
					'open': 4942.17,
					'volume': 118579.37,
					'high': 4983.59,
					'average': 4691.61,
					'low': 4498.91
				},
				{
					'time': '2017-09-01 00:00:00',
					'open': 4766.69,
					'volume': 84307.56,
					'high': 4942.17,
					'average': 4830.77,
					'low': 4730.64
				},
				{
					'time': '2017-08-31 00:00:00',
					'open': 4591.31,
					'volume': 63238.55097879,
					'high': 4787.41,
					'average': 4689.86,
					'low': 4589.91
				},
				{
					'time': '2017-08-30 00:00:00',
					'open': 4586.99,
					'volume': 59726.41593238,
					'high': 4641.73,
					'average': 4586.83,
					'low': 4505.91
				},
				{
					'time': '2017-08-29 00:00:00',
					'open': 4393.57,
					'volume': 79028.2052221,
					'high': 4630.64,
					'average': 4472.10,
					'low': 4350.57
				},
				{
					'time': '2017-08-28 00:00:00',
					'open': 4340.97,
					'volume': 63470.55259118,
					'high': 4403.51,
					'average': 4318.87,
					'low': 4201.32
				},
				{
					'time': '2017-08-27 00:00:00',
					'open': 4349.60,
					'volume': 31307.41317401,
					'high': 4392.85,
					'average': 4350.76,
					'low': 4318.68
				},
				{
					'time': '2017-08-26 00:00:00',
					'open': 4369.82,
					'volume': 32011.69089019,
					'high': 4382.75,
					'average': 4327.32,
					'low': 4272.64
				},
				{
					'time': '2017-08-25 00:00:00',
					'open': 4322.89,
					'volume': 50268.51738028,
					'high': 4459.38,
					'average': 4371.44,
					'low': 4300.54
				}]
			}
		]

		return fixtures
	}
}

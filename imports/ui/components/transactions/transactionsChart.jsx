import React from 'react'
import createG2 from 'g2-react'

const Line = createG2(chart => {
	chart.line()
		.position('Time*Cash Flow')
		.color('Account')
		.shape('spline')
		.size(2)

	chart.render()
})

/**
 * Presents a chart showing transaction information.
 * 
 */
const View = ({
	transactions
}) => {
	return (
		<div>
			<Line
				data={[]}
				width={1200}
				height={400}
				plotCfg={{margin: [10, 100, 50, 120]}}
			/>
		</div>
	)
}

export default View

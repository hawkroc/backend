import React from 'react'
import ClickCopyCell from './common/clickCopyCell'
import EditableCell from './common/editableCell'


export const buildColumns = ({
	languageConfig
}) => {
	return [
		{
			title: "Name",
			width: '40%',

			render: (_, record) => {
				const name = record.services['centrality-blockeeper'].name
				return (
					<EditableCell value={name}/>
				)
			}
		},
		{
			title: "Public key",
			width: '30%',

			render: (_, record) => {
				const publicKey = record.services['centrality-blockeeper'].publicKey
				return (
					<div className="editable-cell">
						<div className="editable-cell-text-wrapper" id={publicKey}>
							{publicKey.substring(0, 12) + '...'}
							<ClickCopyCell text={publicKey}/>
						</div>
					</div>
				)
			}
		}
	]
}

import React from 'react'

import { Popconfirm, Select } from 'antd';
import EditableCell from './common/editableCell'


export const buildColumns = ({
    onUpdateLabel
}) => {
    return [
        {
            title: 'name',
            dataIndex: 'name',
            width: '40%',

            render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChangeConfirmed={(newValue) => {
                            record['name'] = newValue;
                            onUpdateLabel(record)
                        }
                    }
                />
            )
        }, 
        {
            title: 'GST',
            dataIndex: 'gst',
            width: '30%',

            render: (text, record, index) => { 
                return  (
                    <div>
                        <Select value={record.gst ? "GST" : "NOGST"} 
                                defaultValue={"true"} 
                                onChange={
                                    (newValue) => {
                                        record['gst'] = (newValue == "true");
                                        onUpdateLabel(record)
                                    }
                                }>
                            <Select.Option value={"true"}>GST</Select.Option>
                            <Select.Option value={"false"}>NOGST</Select.Option>
                        </Select>
                    </div>
                )
            }
        }, 
        {
            title: 'operation',
            dataIndex: 'operation',

            render: (text, record, index) => {
                return (
                    <Popconfirm 
                            title="Are you sure you want to delete this label?" 
                            onConfirm={() => alert("Handle label delete")}>
                        <a href="#">Delete</a>
                    </Popconfirm>
                );
            }
        }
    ]
}
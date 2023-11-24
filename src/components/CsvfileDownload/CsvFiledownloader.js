import React from 'react'
import { CSVLink } from 'react-csv'

const players = [
    {
        name: "Tom Latham", age: 29, team: "New Zealand"
    },
    {
        name: "Devon Conway", age: 30, team: "New Zealand"
    },
    {
        name: "Kane Williamson", age: 31, team: "New Zealand"
    },
    {
        name: "Will Young", age: 29, team: "New Zealand"
    }
]

const headers = [
    {
        label: "Name", key: "name"
    },
    {
        label: "Age", key: "age"
    },
    {
        label: "Team", key: "team"
    }
]

const csvLink = {
    headers: headers,
    data: players,
    filename: "csvfile.csv"
}

export default function CsvFiledownloader(props) {
    return (
        <div>
            <CSVLink {...csvLink}><span style={{color:"#ff8d00"}}>(Download example)</span></CSVLink>
        </div>
    )
}

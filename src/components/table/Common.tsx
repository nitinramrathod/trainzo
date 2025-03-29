import React from 'react'

function TR({ key, children }) {
    return (
        <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            {children}
        </tr>
    )
}
function TD({ children }) {
    return (
        <td className="px-6 py-4">
        {children || "--"}
    </td>
    )
}
export { TR, TD }
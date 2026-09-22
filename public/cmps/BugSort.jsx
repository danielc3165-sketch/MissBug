export function BugSort({ onSetSortBy }) {
    return <div className="bug-filter">
            <p>sort</p>

            <button onClick={() => onSetSortBy('title')}>Title</button>
            <button onClick={() => onSetSortBy('severity')}>Severity</button>
            <button onClick={() => onSetSortBy('creatTimae')}>Creat Time</button>
        </div>
  
}
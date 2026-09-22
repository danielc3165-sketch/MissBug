const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [labelsToRender, setLabelsToRender] = useState(['critical', 'dev-branch', 'need-CR'])
    const [labels,setLables] = useState({})
    

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                handleLabels(field,value)
                return
                break
 
            }
       
        setFilterByToEdit(prevFilter => ({ ...prevFilter,[field]: value }))
    }

  
    function handleLabels(field,value){
        setLables(prev=>{
            //console.log('prev',prev)
            const nextLabels = { ...prev, [field]: value }
            const labelsToSet= Object.keys(nextLabels).filter(label => nextLabels[label]) 
            setFilterByToEdit(prevFilter => ({ ...prevFilter,['labels']: labelsToSet }))

            return nextLabels
        })
    }


    function onSubmitFilter(ev){
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, minSeverity } = filterByToEdit
    return <section>
        <form className="bug-filter" onSubmit={onSubmitFilter}>
            <p>Filter</p>

            <label htmlFor="txt">Text: </label>
            <input value={txt} onChange={handleChange} type="text" placeholder="Search title / desc." id="txt" name="txt" />

            <label htmlFor="minSeverity">Min Severity: </label>
            <input value={minSeverity || ''} onChange={handleChange} type="number" placeholder="By Min Severity" id="minSeverity" name="minSeverity" />

            {/* <label htmlFor="labels">Labels: </label>
            <select onChange={handleChange} id="labels" name="label">
                <option value="none">None</option>
                <option value="critical">Critical</option>
                <option value="dev-branch">Dev Branch</option>
                <option value="need-CR">Need CR</option>
            </select> */}

        </form>

        <div className="bug-filter">

            <p>Labels</p>
            {labelsToRender.map(label => <div key={label}>
                    <label htmlFor={label}>{label}</label>
                    <input
                        type="checkbox"
                        id={label}
                        name={label}
                        onChange={handleChange} />
                </div>)}

        </div>

       </section>
    
}
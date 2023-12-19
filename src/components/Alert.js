function Alert(props) {
    if (props.obj == null) {      // when alert is set to null, don't display anything
        return (
            <div style={{ height: '60px', marginTop: '1px', marginBottom: '5px' }}>
            </div>
        )
    }
    else {
        return (
            <div style={{ height: '60px', marginTop: '1px', marginBottom: '5px' }}>
                <div className={`alert alert-${props.obj.type}`} role="alert" style={{ border: '1px solid black' }}>
                    <strong>{props.obj.message}</strong>
                </div>
            </div>
        )
    }
}

export default Alert
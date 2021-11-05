const withColor = (OriginalComponent) => {
    const NewComponent = (props) => {
        let color = props.count < 0 ? "red" : "green";
        return <OriginalComponent {...props} color={color} />;
    }
    return NewComponent;
}
export default withColor;
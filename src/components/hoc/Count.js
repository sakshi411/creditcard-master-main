import withColor from './withColor';
import withRandom from './withRandom';
const Count = (props) => {
    return <div className="Count" style={{ color: props.color }}>{props.count}</div>
}
// export default withColor(Count);
export default withRandom(Count);
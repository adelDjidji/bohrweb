import Text from "./Text"
import { Icon } from "./Icon"

const DeltaBadge = ({ delta = 32, background=true }) => {
  const bg = delta >0 ? "#E3F9E8" :  "#991b1c33"
  return (
    <span
      className="px-2 py-1 flex items-center gap-x-1"
      style={{
        background: background ? bg : '',
        borderRadius: 32,
        color: delta >0 ? "#19753C" : '#991B1C',
      }}
    >
      <Icon name={ delta >0? "stats-up" : 'stats-down'} />
      <Text type="14-600">{delta}%</Text>
    </span>
  )
}

export default DeltaBadge

import Text from "./Text"

const Badge = ({status='success', ...props}) => {
  const bg = '#E3F9E8'
  return (
    <span
      className="px-1 py-1 flex items-center justify-center"
      style={{
        background: bg,
        borderRadius: 4,
        color: '#1E293B',
      }}
    >
      <Text type="16-600">{props.children}</Text>
    </span>
  )
}

export default Badge

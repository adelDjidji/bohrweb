import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import frLocale from "@fullcalendar/core/locales/fr"
import "./calendar.css"
import ModalEvent from "./ModalEvent"
import { useEffect, useState } from "react"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchOutages } from "../../redux/actions"
import { stringToHexColor } from "../../utils"
import moment from "moment"

const def_events = [
  {
    title: "Rivesaltes - Maintenance",
    extendedProps: {
      data1: 'value1',
      data2: 'value2'
    },
    start: "2023-01-12",
    end: "2023-01-15",
    color: "#FF7B4C40",
  },
  {
    title: "Orlu - Maintenance",
    start: "2023-01-12",
    extendedProps: {
      data1: 'value1',
      data2: 'value2'
    },
    end: "2023-01-13",
    color: "#6BCAFA40",
  },
  {
    title: "Bohr - Maintenance",
    start: "2023-01-12",
    extendedProps: {
      data1: 'value1',
      data2: 'value2'
    },
    end: "2023-01-12",
    color: "#FF7B4C40",
  },
  {
    title: "Rivesaltes - Maintenance",
    start: "2023-01-12",
    extendedProps: {
      data1: 'value1',
      data2: 'value2'
    },
    end: "2023-01-15",
    color: "#6BCAFA40",
  },
  {
    title: "Rivesaltes - Maintenance",
    start: "2023-01-12",
    extendedProps: {
      data1: 'value1',
      data2: 'value2'
    },
    end: "2023-01-15",
    color: "#6BCAFA40",
  },
  {
    title: "Rivesaltes - Maintenance",
    start: "2023-01-12",
    extendedProps: {
      data1: 'value1',
      data2: 'value2'
    },
    end: "2023-01-15",
    color: "#6BCAFA40",
  },
  {
    title: "Rivesaltes - Maintenance",
    start: "2023-01-12",
    extendedProps: {
      data1: 'value1',
      data2: 'value2'
    },
    end: "2023-01-15",
    color: "#6BCAFA40",
  },
  {
    title: "Rivesaltes - Maintenance",
    start: "2023-01-12",
    extendedProps: {
      data1: 'value1',
      data2: 'value2'
    },
    end: "2023-01-15",
    color: "#6BCAFA40",
  },
]

export function Calendar() {
  const {data, loading} = useSelector((state: RootStateOrAny) => state.outage)
  const [modalOpen, setmodalOpen] = useState(false)
  const [modalData, setmodalData] = useState<any>()
  const [events, setevents] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOutages())
  }, [])

  useEffect(() => {
    !!data && setevents(data.map(item=>({
      title:`${item.name} - ${item.comment}`,
      start:moment(item.start_date).format('YYYY-MM-DD'),
      end:moment(item.end_date).format('YYYY-MM-DD'),
      color: stringToHexColor(item.name)+'40',
      extendedProps:item
    })))
  }, [data])

  

  return (
    <div>
      <ModalEvent data={modalData} open={modalOpen} onClose={()=>setmodalOpen(false)}/>
      <FullCalendar
        headerToolbar={{
          start: "",
          center: "prev,title,next",
          end: "",
        }}
        showNonCurrentDates={false}
        dayHeaderFormat={{ weekday: "long" }}
        locale={frLocale}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        eventBackgroundColor="red"
        eventTextColor="black"
        eventClassNames={"event-custom"}
        dayMaxEvents={3}
        eventClick={({event})=>{
            setmodalData(event.extendedProps)
            setmodalOpen(true)            
        }}
      />
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

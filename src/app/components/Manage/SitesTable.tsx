import { Col, Row, Table } from "antd"
import dayjs from "dayjs"
    import { useEffect, useState } from "react"
import { RootStateOrAny, useSelector } from "react-redux"
import Badge from "../Badge"
import Card from "../Card"
import { DateSelector } from "../DateSelector"
import SelectDropdown from "../SelectDropdown"

const columns = [
  {
    title: "Site",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Montant",
    dataIndex: "amount",
    key: "amount",
    responsive: ["lg"],
    render: (_, { amount }) => amount.toLocaleString("fr") + "€",
  },
  {
    title: "MeCapa",
    dataIndex: "mecapa",
    key: "mecapa",
    responsive: ["lg"],
    render: (_, { mecapa }) => mecapa.toLocaleString("fr") + "€",
  },
  {
    title: "Énergie",
    dataIndex: "power",
    key: "power",
    responsive: ["lg"],
    render: (_, { power }) => power.toLocaleString("fr") + "€",
  },
  {
    title: "GOs",
    dataIndex: "gos",
    key: "gos",
    responsive: ["lg"],
    render: (_, { gos }) => gos.toLocaleString("fr") + "€",
  },
  {
    title: "Statut",
    dataIndex: "status",
    key: "status",
    responsive: ["lg"],
    render: (_, { status }) => <Badge>{status}</Badge>,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    sorter: (a, b) => dayjs(a.date).diff(dayjs(b.date),'day'),
    sortDirections: ['descend'],
    responsive: ["lg"],
    render: (_, { date }) => dayjs(date).format("DD MMM YYYY à HH:mm"),
  },
]

export default () => {
  const { data: d, loading } = useSelector(
    (state: RootStateOrAny) => state.portfolio
  )
  const { sites } = useSelector((state: RootStateOrAny) => state.commun)
  const [showedData, setShowedData] = useState(d?.portfolio_historical)

 
  const [filters, setfilters] = useState({
    sites: [],
    start_time: null,
    end_time: null,
  })
  const handleFilterBySite = sites => {

    //filter data by site
    setfilters({ ...filters, sites })
    // if (sites.length) {
    //   let sites_ = sites.map(r => r.name)
    //   console.log('new data ',d?.portfolio_historical.filter(item => sites_.includes(item.name)))
    //   setShowedData(
    //     d?.portfolio_historical.filter(item => sites_.includes(item.name))
    //   )
    // } else {
    //   setShowedData(d?.portfolio_historical)
    // }
  }

  useEffect(() => {
    let tmp = d?.portfolio_historical

    if(!!tmp){
      var selection: any = true
      const { end_time, start_time } = filters
      if (end_time && start_time)
        selection = row =>
          dayjs(row.date).isAfter(dayjs(start_time)) &&
          dayjs(row.date).isBefore(dayjs(end_time))
      else {
        if (start_time && !end_time) {
          selection = row => dayjs(row.date).isAfter(dayjs(start_time))
        }
        if (!start_time && end_time) {
          selection = row => dayjs(row.date).isBefore(dayjs(end_time))
        }
        if (!start_time && !end_time) {
          selection = row => true
        }
      }
  
      tmp = tmp?.filter(selection)
  
      if (filters.sites.length) {
        tmp = tmp.filter(row => filters.sites.map(r => r.name).includes(row.name))
      }
      setShowedData(tmp)
    }
    
  }, [filters])

  function dateFilterPlaceholder(){
    var placeholder='Filtrer par date'
    const { end_time, start_time } = filters
    if (end_time && start_time)
      placeholder = dayjs(start_time).format('DD MMM YYYY') + ' à '+ dayjs(end_time).format('DD MMM YYYY')
    else {
      if (start_time && !end_time) {
        placeholder = 'Après ' + dayjs(start_time).format('DD MMM YYYY')
      }
      if (!start_time && end_time) {
        placeholder = 'Avant ' + dayjs(end_time).format('DD MMM YYYY')
      }
    }
    return placeholder
  }
  return (
    <Card
      className="w-full"
      title="Mes sites"
      headerRight={
        <div className="flex flex-wrap gap-x-4">
          <SelectDropdown
            placeholder="Filtrer par site"
            keyAttribute="public_id"
            valueAttribute="name"
            items={sites}
            defaultValues={filters.sites}
            onSelect={handleFilterBySite}
          />
          <SelectDropdown
            items={[]}
            placeholder={dateFilterPlaceholder()}
            footerClickExitEvent={false}
            FooterComponent={
              <Row className="flex items-center" gutter={24}>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                    Date de début
                  </label>
                  <DateSelector
                    // defaultValue={filters.start_time}
                    onDateChange={(date:any) => setfilters({ ...filters, start_time:date })}
                    // onChange={(date: string) => setstart_time(date)}
                    format="YYYY-MM-DD"
                  />
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                    Date de Fin
                  </label>
                  <DateSelector
                    // defaultValue={filters.end_time}
                    // onChange={(date: string) => setend_time(date)}
                    onDateChange={(date:any) => setfilters({ ...filters, end_time:date })}
                    format="YYYY-MM-DD"
                  />
                </Col>
              </Row>
            }
          />
        </div>
      }
    >
      <Table
        loading={loading}
        pagination={false}
        dataSource={showedData}
        columns={columns}
      />
    </Card>
  )
}

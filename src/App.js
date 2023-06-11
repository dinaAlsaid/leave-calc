import { useEffect, useState } from 'react';
import moment from 'moment';


const dayStart = moment({ hours: 8, minutes: 0 })
const dayEnd = moment({ hours: 17, minutes: 30 })
const nineOclk = dayStart.clone().add(1, 'hours');
// const eightThirtyOclk = dayStart.clone().add(30, 'minutes');
// const fiveOclk = dayEnd.clone().subtract(30, 'minutes');
const fourThirtyOclk = dayEnd.clone().subtract(1, "hours");

const OutTimeForm = () => {
  const [inTime, setInTime] = useState(dayStart)
  const [outTime, setOutTime] = useState(dayEnd)

  useEffect(() => {

    if (inTime.isBetween(dayStart, nineOclk)) {
      setOutTime(inTime.clone().add(8, 'hours').add(30, "minutes"))
    } else if (inTime.isSameOrBefore(dayStart)) {
      setOutTime(fourThirtyOclk)//4:30
    } else if (inTime.isSameOrAfter(nineOclk)) {
      setOutTime(dayEnd)//5:30
    }

  }, [inTime])

  const onChangeIn = (e) => {
    setInTime(moment(e.target.value, "HH:mm"))
  }
  return (<>
    <div>
      <input type="time" value={inTime.format('HH:mm')} onChange={onChangeIn} />
    </div>

    <div>
      {/* <input type="time" value={outTime.format('HH:mm')} onChange={onChangeOut} /> */}
      OUT TIME:
      {outTime.format('HH:mm')}
    </div>
  </>)
}

const LeaveCalcForm = () => {
  const [inTime, setInTime] = useState(dayStart)
  const [outTime, setOutTime] = useState(fourThirtyOclk)

  const [leaveStart, setLeaveStart] = useState(null)
  const [leaveEnd, setLeaveEnd] = useState(null)



  useEffect(() => {
    if (inTime.isSameOrAfter(dayStart) && inTime.isSameOrBefore(nineOclk)) {
      if (outTime.diff(inTime, 'minutes') < 510) {
        setLeaveStart(outTime)
        setLeaveEnd(inTime.clone().add(8, 'hours').add(30, "minutes"))
      } else {
        setLeaveStart(null)
        setLeaveEnd(null)
      }
    } else if (inTime.isAfter(nineOclk)) {
      setLeaveStart(nineOclk)
      setLeaveEnd(inTime)
    } else if (inTime.isBefore(dayStart)) {
      if (outTime.diff(dayStart) < 510) {
        setLeaveStart(outTime)
        setLeaveEnd(fourThirtyOclk)
      } else {
        setLeaveStart(null)
        setLeaveEnd(null)
      }
    } else {
      setLeaveStart(null)
      setLeaveEnd(null)
    }


  }, [inTime, outTime])

  const onChangeIn = (e) => {
    const val = moment(e.target.value, "HH:mm");
    setInTime(val)
  }

  const onChangeOut = (e) => {
    const val = moment(e.target.value, "HH:mm");
    setOutTime(val)
  }

  return (<>
    <div>
      <input type="time" value={inTime.format('HH:mm')} onChange={onChangeIn} />
    </div>
    <div>
      <input type="time" value={outTime.format('HH:mm')} onChange={onChangeOut} />
    </div>
    <div>
      LEAVE DETAILS
      <div>from: {leaveStart?.format('HH:mm')}</div>
      <div>to: {leaveEnd?.format('HH:mm')}</div>

    </div>
  </>)
}


function App() {
  const [mode, setMode] = useState(0)
  const changeCalcEq = (e) => {
    setMode(e.target.value)
  }

  return (
    <div className="App">
      <header>

      </header>

      <select onChange={changeCalcEq} value={mode} >
        <option value={0}>حساب وقت الخروج</option>
        <option value={1}>حساب مدة المغادرة</option>
      </select>

      {!mode && (<OutTimeForm />)}
      {!!mode && (<LeaveCalcForm />)}


    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";
import PatientByDate from '../PatientByDate/PatientByDate';
import Patient from '../Patient/Patient';
import RecentApointment from '../RecentApointment/RecentApointment';
import Prescription from '../Prescription/Prescription';




const Dashboard = () => {

  const [dashboard, setDashboard] = useState(true);
  const [apointment, setApointment] = useState(false);
  const [patients, setPatients] = useState(false);
  const [prescriptions, setPrescriptions] = useState(false);
  const [setting, setSetting] = useState(false);

  const [calenderDate, setCalenderDate] = useState(new Date());

  const [allPatient, setAllPatient] = useState([]);


  const [patientByDate, setPatientByDate] = useState([]);

  let SlNo = 1;
  let SlNo2 = 1;
  let SlNo3 = 1;

  useEffect(() => {

    fetch('https://warm-eyrie-65386.herokuapp.com/allPatient')
      .then(res => res.json())
      .then(data => {
        setAllPatient(data);
      })

  }, [])

  const handleCalender = date => {
    setCalenderDate(date);
    let month = (date.toString()).split(" ")[1];
    let day = (date.toString()).split(" ")[2];
    let year = (date.toString()).split(" ")[3];

    const patient = allPatient.filter(pat => pat.date === (month + "-" + day + "-" + year));
    setPatientByDate(patient);
  }





  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }));


  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };





  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{ display: dashboard ? 'block' : 'none' }} variant="h6" noWrap>
            Dashboard
          </Typography>
          <Typography style={{ display: apointment ? 'block' : 'none' }} variant="h6" noWrap>
            Appointment
           </Typography>
          <Typography style={{ display: patients ? 'block' : 'none' }} variant="h6" noWrap>
            Patients
           </Typography>
          <Typography style={{ display: prescriptions ? 'block' : 'none' }} variant="h6" noWrap>
            Prescriptions
          </Typography>
          <Typography style={{ display: setting ? 'block' : 'none' }} variant="h6" noWrap>
            Setting
          </Typography>

        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />


        <List>

          <ListItem onClick={() => {
            setDashboard(true);
            setApointment(false);
            setPatients(false);
            setPrescriptions(false);
            setSetting(false);
          }}
            button key="Dashboard">
            <ListItemIcon>{<DashboardIcon />}</ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>


          <ListItem onClick={() => {
            setDashboard(false);
            setApointment(true);
            setPatients(false);
            setPrescriptions(false);
            setSetting(false);

          }} button key="Appointment">
            <ListItemIcon>{<InboxIcon />}</ListItemIcon>
            <ListItemText primary="Appointment" />
          </ListItem>

          <ListItem onClick={() => {
            setDashboard(false);
            setApointment(false);
            setPatients(true);
            setPrescriptions(false);
            setSetting(false);
          }} button key="Patients">
            <ListItemIcon>{<PeopleIcon />}</ListItemIcon>
            <ListItemText primary="Patients" />
          </ListItem>

          <ListItem onClick={() => {
            setDashboard(false);
            setApointment(false);
            setPatients(false);
            setPrescriptions(true);
            setSetting(false);

          }} button key="Prescriptions">
            <ListItemIcon>{<AssignmentIcon />}</ListItemIcon>
            <ListItemText primary="Prescriptions" />
          </ListItem>

        </List>
        <Divider />
        <List>
          <ListItem onClick={() => {
            setDashboard(false);
            setApointment(false);
            setPatients(false);
            setPrescriptions(false);
            setSetting(true);

          }} button key="Setting">
            <ListItemIcon>{<SettingsIcon />}</ListItemIcon>
            <ListItemText primary="Setting" />
          </ListItem>

          <Link to="/home">
            <ListItem button key="Logout">
              <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </Link>

        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div style={{ display: dashboard ? 'block' : 'none' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="d-flex align-items-center p-3 px-4  rounded text-white bg-danger button-margin">
                  <h1>15 </h1>
                  <h6>Pending Appointments</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-flex align-items-center p-3 px-4  rounded text-white bg-info button-margin">
                  <h1>15 </h1>
                  <h6>Today's Appointments</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-flex align-items-center p-3 px-4  rounded text-white bg-success button-margin">
                  <h1>15 </h1>
                  <h6>Total Appointments</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-flex align-items-center p-3 px-4  rounded text-white bg-warning button-margin">
                  <h1>15 </h1>
                  <h6>Total Patients</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row bg-white rounded shadow-sm p-3">
              <div className="col-md-12 py-3 d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="recent-color">Recent Appointments</h6>
                </div>
                <div className="selector">
                  <DateRangeIcon />
                  <select className="p-1 rounded">
                    <option value="Weak">Weak</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row bg-white rounded shadow-sm p-3">
              <div className="col-md-12">
                <table className="table table-borderless">
                  <thead>
                    <tr className="text-center">
                      <th className="text-secondary text-left" scope="col">Sl No</th>
                      <th className="text-secondary" scope="col">Date</th>
                      <th className="text-secondary" scope="col">Time</th>
                      <th className="text-secondary" scope="col">Name</th>
                      <th className="text-secondary" scope="col">Contact</th>
                      <th className="text-secondary" scope="col">Prescription</th>
                      <th className="text-secondary" scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      //Dynamic Row to data will come database
                    }
                    {
                      allPatient.map(patient => <RecentApointment patient={patient} key={patient._id} sl={SlNo++}></RecentApointment>)
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        <div style={{ display: apointment ? 'block' : 'none' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <Calendar
                  onChange={handleCalender}
                  value={calenderDate}
                />
              </div>
              <div className="col-md-8">
                <div className="bg-white rounded shadow-sm p-3" style={{ height: '442px', overflow: 'auto' }}>
                  <div className="py-3 d-flex align-items-center justify-content-between">
                    <h6 className="recent-color">Appointment</h6>
                    <div>
                      {(calenderDate.toString()).split(" ")[0]} {(calenderDate.toString()).split(" ")[1]} {(calenderDate.toString()).split(" ")[2]}, {(calenderDate.toString()).split(" ")[3]}
                    </div>
                  </div>
                  <table className="table table-borderless">
                    <thead>
                      <tr className="text-center">
                        <th className="text-secondary" scope="col">Name</th>
                        <th className="text-secondary" scope="col">Schedule</th>
                        <th className="text-secondary" scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        patientByDate.map(patient => <PatientByDate id={patient._id} patient={patient}></PatientByDate>)
                      }

                    </tbody>
                  </table>

                </div>

              </div>
            </div>
          </div>
        </div>

        <div style={{ display: patients ? 'block' : 'none' }}>
          <div className="container">
            <div className="row bg-white rounded shadow-sm p-3">
              <div className="col-md-12 py-3 d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="recent-color">All Patients</h6>
                </div>
                <div className="selector">
                  <DateRangeIcon />
                  <select className="p-1 rounded">
                    <option value="Weak">Weak</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row bg-white rounded shadow-sm p-3">
              <div className="col-md-12">
                <table className="table table-borderless">
                  <thead>
                    <tr className="text-center">
                      <th className="text-secondary text-left" scope="col">Sl No</th>
                      <th className="text-secondary" scope="col">Name</th>
                      <th className="text-secondary" scope="col">Gender</th>
                      <th className="text-secondary" scope="col">Age</th>
                      <th className="text-secondary" scope="col">Weight</th>
                      <th className="text-secondary" scope="col">Phone</th>
                      <th className="text-secondary" scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      //Dynamic Row to data will come database
                    }
                    {
                      allPatient.map(patient => <Patient patient={patient} key={patient._id} sl={SlNo2++}></Patient>)
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: prescriptions ? 'block' : 'none' }}>

          <div className="container">
            <div className="row bg-white rounded shadow-sm p-3">
              <div className="col-md-12 py-3 d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="recent-color">All Prescriptions</h6>
                </div>
                <div className="selector">
                  <DateRangeIcon />
                  <select className="p-1 rounded">
                    <option value="Weak">Weak</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row bg-white rounded shadow-sm p-3">
              <div className="col-md-12">
                <table className="table table-borderless">
                  <thead>
                    <tr className="text-center">
                      <th className="text-secondary text-left" scope="col">Sl No</th>
                      <th className="text-secondary" scope="col">Date</th>
                      <th className="text-secondary" scope="col">Time</th>
                      <th className="text-secondary" scope="col">Name</th>
                      <th className="text-secondary" scope="col">Contact</th>
                      <th className="text-secondary" scope="col">Prescription</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      //Dynamic Row to data will come database
                    }
                    {
                      allPatient.map(patient => <Prescription patient={patient} key={patient._id} sl={SlNo3++
                      }></Prescription>)
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>


        </div>

        <div style={{ display: setting ? 'block' : 'none' }} className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>Setting is Under Maintanance</h3>
            </div>
          </div>
        </div>

      </main>
    </div >
  );
};

export default Dashboard;
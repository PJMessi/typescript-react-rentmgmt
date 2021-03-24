import './App.css';
import CustomizedSnackbars from './components/Notification';
import AppRoute from './routes/AppRoute';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <AppRoute />
      <CustomizedSnackbars />
    </div>
  );
};

export default App;

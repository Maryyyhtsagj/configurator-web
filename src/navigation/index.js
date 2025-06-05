import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import { Navigate } from 'react-router';
import { useAtom, Provider } from 'jotai/index';
import UiKit from '../pages/UiKit';
import store from '../atoms';
import Wrapper from '../components/Wrapper';
import Home from '../pages/Home';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import PersonalData from '../pages/PersonalData';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import PasswordRecovery from '../pages/PasswordRecovery';
import EnterPassword from '../pages/PasswordRecovery/components/EnterPassword';
import Contact from '../pages/Contact';
import Instruction from '../pages/Instruction';
import About from '../pages/About';
import AuthRoutes from './AuthRoutes';
import { isAuthAtom } from '../atoms/accountAtoms';
import ProtectedRoutes from './ProtectedRoutes';
import Configurator from '../pages/Configurator';
import ConfigurationDetails from '../components/ConfigurationDetails';
import MyProjects from '../pages/MyProjects';
import Configurations from '../pages/Configurations';

function Navigation() {
  const [isAuth] = useAtom(isAuthAtom);
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Wrapper />}
          >
            <Route element={<AuthRoutes isAuth={isAuth} screenToNavigate="/configurator" />}>
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/password" element={<PasswordRecovery />} />
              <Route path="/password-recovery/:token" element={<EnterPassword />} />
            </Route>
            <Route element={<ProtectedRoutes isAuth={isAuth} unAuthorizedFirstScreen="/login" />}>
              <Route path="/configurator" element={<Configurator />} />
              <Route path="/personal" element={<PersonalData />} />
              <Route path="/my-projects" element={<MyProjects />} />
              <Route path="/configurations" element={<Configurations withProject />} />
              <Route path="/configurations-history" element={<Configurations />} />
            </Route>

            <Route path="/ui-kit" element={<UiKit />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/instructions" element={<Instruction />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/details" element={<ConfigurationDetails />} />
            {/* <Route path="/projects" element={<MyProject />} /> */}

          </Route>
        </Routes>

      </Router>
    </Provider>
  );
}

export default Navigation;

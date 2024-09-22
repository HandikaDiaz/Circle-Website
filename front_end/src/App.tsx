import { useEffect } from 'react';
import { UserStoreDTO } from './features/auth/types/dto';
import { apiV1 } from './libs/api';
import { AppRouter } from './routes';
import { setUser } from './store/auth.slice';
import { useAppDispatch } from './store/hooks/use.store';
import Cookies from "js-cookie";

function App() {
  const dispatch = useAppDispatch();

  async function checkAuth() {
    const { data } = await apiV1.get<null, { data: UserStoreDTO }>("/auth/check", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    })

    dispatch(setUser(data))
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return <AppRouter />
}

export default App

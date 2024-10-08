import { StatusBar } from 'expo-status-bar';
import { Home } from './src/screens/home';

import { useFonts, Oxanium_400Regular, Oxanium_700Bold } from '@expo-google-fonts/oxanium';
import AppLoading from 'expo-app-loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TasksProvider } from './src/contexts/tasksContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    'oxanium-regular': Oxanium_400Regular,
    'oxanium-bold': Oxanium_700Bold
  })

  if(!fontsLoaded){
    <AppLoading/>
  }

  return (
    <GestureHandlerRootView>
      <TasksProvider>
        <Home/>
        <StatusBar style="auto" />
      </TasksProvider>
    </GestureHandlerRootView>
  );
}

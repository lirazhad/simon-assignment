import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {RootNavigator} from './src/navigation/RootNavigator';
import {QueryClient, QueryClientProvider} from 'react-query';
import {colors} from './src/constants/AppStyle';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <RootNavigator />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default App;

import { Flex, Text } from '@radix-ui/themes';
import { Chart } from './components/Chart.jsx';

export default function App() {
  return (
    <Flex direction="column" gap="2">
      <Chart />
    </Flex>
  );
}
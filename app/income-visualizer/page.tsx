import { HeaderSimple } from '../../components/HeaderSimple/HeaderSimple';
import { Container } from '@mantine/core';
import IncomeVisualizer from '@/components/IncomeVisualizer/IncomeVisualizer';
import { Title, Text } from '@mantine/core';

export default function Visualizer() {
    return (
        <>
            <HeaderSimple />
            <Container my="lg">
                <Title ta="center" mt={100}>
                    <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
                        Subway Line Income Visualizer
                    </Text>
                </Title>
                <IncomeVisualizer />
            </Container>
        </>
    );
}

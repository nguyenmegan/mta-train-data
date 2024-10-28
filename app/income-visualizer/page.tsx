import { HeaderSimple } from '../../components/HeaderSimple/HeaderSimple';
import { FooterSimple } from '../../components/FooterSimple/FooterSimple';
import { Container } from '@mantine/core';
import IncomeVisualizer from '@/components/IncomeVisualizer/IncomeVisualizer';
import { Title, Text } from '@mantine/core';

export default function Visualizer() {
    return (
        <>
            <HeaderSimple />
            <Container my="lg">
                <Title ta="center" mb={30}>
                    <Text inherit component="span">
                        Subway Line Income Visualizer
                    </Text>
                </Title>
                <IncomeVisualizer />
            </Container>
            <FooterSimple />
        </>
    );
}

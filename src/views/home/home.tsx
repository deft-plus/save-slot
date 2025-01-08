import { Container } from '@/components/container';
import { StandAloneNavigation } from '@/components/drawer';

export function HomeView() {
  return (
    <Container className="home">
      <h1>Welcome</h1>
      <p>Select a game from the menu:</p>
      <div className="list">
        <StandAloneNavigation />
      </div>
    </Container>
  );
}

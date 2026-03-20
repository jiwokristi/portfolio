import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center">
      <Container className="text-center">
        <h1 className="mb-4 text-display font-bold">404</h1>
        <p className="mb-8 text-lg text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button href="/">Back to Home</Button>
      </Container>
    </section>
  );
}

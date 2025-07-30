import {
  Box,
  Text,
  Container,
  Field,
  Card,
  createListCollection,
  Button,
  HStack,
  Input,
  Portal,
  Select,
  VStack,
  Center,
  NumberInput,
} from "@chakra-ui/react";

function App() {
  const onSubmit = () => {
    // Handle form submission logic here
  };

  const frameworks = createListCollection({
    items: [
      { label: "fall 2025", value: "fall" },
      { label: "winter 2026", value: "winter" },
      { label: "summer 2026", value: "summer" },
    ],
  });

  return (
    <Center
      h={"100vh"}
      flexDirection="column"
      gap={4}
      style={{
        backgroundImage: "linear-gradient(to top, black, black, #183061ff)",

        color: "white",
      }}
    >
      <Text
        fontSize="6xl"
        fontWeight="extrabold"
        style={{
          backgroundImage: "linear-gradient(to left, #7928CA, cyan)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        course notifier
      </Text>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        bgGradient="to-l"
        gradientFrom="#7928CA"
        gradientTo="cyan"
        bgClip="text"
      >
        get notified when a Full or No Waitlist class opens at Carleton
        University.
      </Text>

      <Card.Root width={"full"} maxWidth={"md"} data-testid="login-form">
        <Card.Body py={2}>
          <form onSubmit={onSubmit}>
            <VStack className={"w-full"} gap={"12px"}>
              {/* first name */}
              <Field.Root>
                <Field.Label>first name</Field.Label>
                <Input placeholder="enter you firstname" />
              </Field.Root>

              {/* Email */}
              <Field.Root required>
                <Field.Label>email</Field.Label>
                <Input placeholder="enter your email" />
              </Field.Root>

              {/* term */}
              <Field.Root required>
                <Field.Label>term</Field.Label>
                <Select.Root collection={frameworks} color={"#A7A9AD"}>
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="select a term" />
                    </Select.Trigger>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {frameworks.items.map((framework) => (
                          <Select.Item item={framework} key={framework.value}>
                            {framework.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Field.Root>

              {/* CRN */}
              <Field.Root required>
                <Field.Label>
                  course CRN <Field.RequiredIndicator />
                </Field.Label>
                <NumberInput.Root width="100%" min={0} max={99999}>
                  <NumberInput.Control />
                  <NumberInput.Input />
                </NumberInput.Root>
              </Field.Root>

              <Button
                width={"80%"}
                m={2}
                variant="solid"
                type="submit"
                bgGradient="to-l"
                gradientFrom="#7928CA"
                gradientTo="cyan"
              >
                submit
              </Button>
            </VStack>
          </form>
        </Card.Body>
      </Card.Root>
    </Center>
  );
}

export default App;

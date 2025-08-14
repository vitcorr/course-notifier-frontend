import {
  Box,
  Text,
  Field,
  Card,
  createListCollection,
  Button,
  Input,
  Portal,
  Select,
  Spinner,
  VStack,
  NumberInput,
  Alert,
  CloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toaster } from "./components/ui/toaster";

type FormFields = {
  name: string;
  email: string;
  term: string;
  crn: number;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const [error, setError] = useState(false);

  //validate response type
  const validateResponse = (data: string) => {
    if (data.includes("Success")) {
      toaster.create({
        title: "Success",
        description: data,
        type: "success",
        closable: true,
        duration: 10000,
      });
    } else {
      toaster.create({
        title: "Error",
        description: data,
        type: "error",
        closable: true,
        duration: 10000,
      });
    }
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
    console.log("Form submitted with data:", data);
    // Here you can handle the form submission, e.g., send data to an API
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then((data) => {
        //validate the response type
        validateResponse(data);
        console.log("Response from server:", data);
      })
      .catch((err) => {
        console.log("Error: ", err);
        setError(true);
      });
  };

  const frameworks = createListCollection({
    items: [
      { label: "summer 2025", value: "202520" },
      { label: "fall 2025", value: "202530" },
      { label: "winter 2026", value: "202610" },
    ],
  });

  return (
    <Box
      h={"100vh"}
      w={"100vw"}
      display="flex"
      alignItems={{ base: "start", md: "center" }}
      flexDirection="column"
      p={{ base: 4, md: 8 }}
      gap={4}
      style={{
        backgroundImage: "linear-gradient(to top, black, black, #183061ff)",

        color: "white",
      }}
    >
      {error && (
        <Alert.Root status="error" title="server error">
          <Alert.Indicator />
          <Alert.Title>
            unable to connect to server..try again later
          </Alert.Title>
          <CloseButton
            as="button"
            onClick={() => {
              setError(false);
            }}
            pos="relative"
            top="-2"
            insetEnd="-2"
          />
        </Alert.Root>
      )}
      <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold">
        Beta v.1.0
      </Text>
      <Text
        fontSize={{ base: "3xl", md: "6xl" }}
        fontWeight="extrabold"
        bgGradient="to-l"
        gradientFrom="#7928CA"
        gradientTo="cyan"
        bgClip="text"
      >
        course notifier
      </Text>
      <Text
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight="bold"
        bgGradient="to-l"
        gradientFrom="#7928CA"
        gradientTo="cyan"
        bgClip="text"
      >
        get notified when a Full or No Waitlist class opens at Carleton
        University.
      </Text>

      <Card.Root
        width={{ base: "80%", md: "full" }}
        maxWidth={"md"}
        data-testid="login-form"
      >
        <Card.Body py={2}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack className={"w-full"} gap={"12px"}>
              {/* first name */}
              <Field.Root>
                <Field.Label>name</Field.Label>
                <Input
                  {...register("name")}
                  placeholder="enter your name"
                  fontSize={{ base: "md" }}
                />
              </Field.Root>

              {/* Email */}
              <Field.Root invalid={!!errors.email}>
                <Field.Label>email</Field.Label>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="enter your email"
                  fontSize={{ base: "md" }}
                />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>

              {/* term */}
              <Field.Root invalid={!!errors.term}>
                <Field.Label>term</Field.Label>
                <Select.Root
                  {...register("term", {
                    required: "Term is required",
                    validate: (value) => {
                      if (!value) return "Please select a term";
                      return true;
                    },
                  })}
                  collection={frameworks}
                  color={"#A7A9AD"}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText
                        placeholder="select a term"
                        fontSize={{ base: "md" }}
                      />
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
                <Field.ErrorText>{errors.term?.message}</Field.ErrorText>
              </Field.Root>

              {/* CRN */}
              <Field.Root invalid={!!errors.crn}>
                <Field.Label>
                  course CRN <Field.RequiredIndicator />
                </Field.Label>
                <NumberInput.Root width="100%" min={0}>
                  <NumberInput.Control />
                  <NumberInput.Input
                    {...register("crn", {
                      required: "CRN is required",
                      pattern: {
                        value: /^[0-9]{5}$/,
                        message: "CRN must be a 5-digit number",
                      },
                    })}
                    placeholder="enter course CRN"
                    fontSize={{ base: "md" }}
                  />
                </NumberInput.Root>
                <Field.ErrorText>{errors.crn?.message}</Field.ErrorText>
              </Field.Root>

              <Button
                width={"80%"}
                m={2}
                variant="solid"
                type="submit"
                bgGradient="to-l"
                gradientFrom="#7928CA"
                gradientTo="cyan"
                disabled={isSubmitting}
              >
                submit
              </Button>

              {isSubmitting && (
                <VStack colorPalette="cyan">
                  <Spinner color="colorPalette.600" />
                  <Text color="colorPalette.600">
                    Submitting, this may take a while...
                  </Text>
                </VStack>
              )}
            </VStack>
          </form>
        </Card.Body>
      </Card.Root>
      <Toaster />
    </Box>
  );
}

export default App;

import {
  AppShell,
  BackgroundImage,
  Card,
  Image,
  Input,
  Text,
  Stack,
  createStyles,
  Container,
  Group,
  Anchor,
  ActionIcon,
  Modal,
  TextInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import Head from "next/head";
import { useState } from "react";
import { Plus, Search, Tex } from "tabler-icons-react";

const useStyles = createStyles(() => ({
  appshell: {},
}));

export default function Home() {
  const [links, setLinks] = useState([
    {
      name: "Google",
      link: "www.google.com",
    },
  ]);

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({ initialValues: { name: "", link: "" } });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackgroundImage src="./wallhaven-dpo38l.jpg">
        <AppShell>
          <Stack p={40} align="center">
            <Input
              size="lg"
              w={360}
              radius={"8px"}
              variant="filled"
              placeholder="Search"
              rightSection={
                <Search
                  size="1rem"
                  style={{ display: "block", opacity: 0.5 }}
                />
              }
            />

            <Group mt={80} position="center" w={"60%"} spacing={"xl"}>
              {links.map((link) => (
                <LinkCard title={link.name} link={link.link} />
              ))}
              <ActionIcon w={92} h={92} mb={36} onClick={open}>
                <Plus />
              </ActionIcon>

              <Modal opened={opened} onClose={close} title="Add new Link">
                <form
                  onSubmit={form.onSubmit((v) => {
                    if(v.link.startsWith("https://")) v.link = v.link.replace("https://", "");
                    setLinks((prevState) => {
                      prevState.push(v);
                      return prevState;
                    });
                  })}
                >
                  <TextInput
                    placeholder="Name"
                    label="Name"
                    withAsterisk
                    {...form.getInputProps("name")}
                  />
                  <TextInput
                    placeholder="URL"
                    label="Link"
                    withAsterisk
                    {...form.getInputProps("link")}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Modal>
            </Group>
          </Stack>
        </AppShell>
      </BackgroundImage>
    </>
  );
}

function LinkCard({ title, link }: any) {
  return (
    <Anchor href={link}>
      <Stack spacing={"xs"}>
        <Card>
          <Image src={`https://icon.horse/icon/${link}`} width={60} />
        </Card>
        <Text color="#fff" align="center">
          {title}
        </Text>
      </Stack>
    </Anchor>
  );
}

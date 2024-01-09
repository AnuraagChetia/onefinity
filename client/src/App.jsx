import { useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

function App() {
  const [resume, setResume] = useState();
  const [skills, setSkills] = useState();
  const [githubUsername, setGithubUsername] = useState();
  const [github, setGithub] = useState();
  const [repos, setRepos] = useState();
  //send resume to backend
  const resumeSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", resume);
    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/upload-resume`,
        formData
      );
      setSkills(data.skills);
      setGithub(data.github);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const githubHandler = async () => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${githubUsername}/repos`
      );
      setRepos(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const resetHandler = () => {
  //   setRepos(null);
  //   setSkills("");
  //   setResume(null);
  //   setGithub(null);
  //   setGithubUsername(null);
  // };
  return (
    <>
      {/* <Button
        mb="2"
        onClick={() => {
          resetHandler();
        }}
      >
        Reset
      </Button> */}
      <form encType="multipart/form-data" onSubmit={resumeSubmitHandler}>
        <FormControl display="flex" w="100%">
          <FormLabel>Resume:</FormLabel>
          <Input
            type="file"
            p="1"
            accept=".pdf"
            onChange={(e) => {
              setResume(e.target.files[0]);
            }}
          />
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
      {skills && (
        <Box border="1px" p="4">
          <Text as="h1" fontWeight="600">
            Skills
          </Text>
          {skills?.map((skill) => (
            <Text color="black">{skill}</Text>
          ))}
        </Box>
      )}
      {github && (
        <>
          <Text>
            Github: <Link href={github}>{github}</Link>
          </Text>
        </>
      )}
      <FormControl display="flex" w="100%">
        <FormLabel>Github username</FormLabel>
        <Input
          type="text"
          onChange={(e) => {
            setGithubUsername(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            githubHandler();
          }}
        >
          Submit
        </Button>
      </FormControl>
      {repos && (
        <Flex direction="column" textAlign="start">
          <Text as="h1" fontSize="40" textAlign="center">
            Repos
          </Text>
          {repos?.map((repo) => (
            <Text>{repo.name}</Text>
          ))}
        </Flex>
      )}
    </>
  );
}

export default App;

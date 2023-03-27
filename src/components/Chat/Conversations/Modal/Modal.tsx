import { SearchUsersData, SearchUsersInput } from "@/src/util/types";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Button, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Modal, Stack, Input } from "@chakra-ui/react";
import { useState } from "react";
import UserOperations from '../../../../graphql/operations/user';
import UserSearchList from "./UserSearchList";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  // useLazyQuery is the async 
  const [searchUsers, { data, error, loading }] = useLazyQuery<
  SearchUsersData,
  SearchUsersInput
  >(UserOperations.Queries.searchUsers);

  console.log('here SEARCHED DATA', data);
  

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // search user query
    searchUsers({ variables: { username } })
    // console.log("inside onSearch", username);
    
  }


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#faf3dd" pb={4}>
          <ModalHeader>Find User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input 
                  placeholder="Enter a username" 
                  value={username} 
                  onChange={event => setUsername(event.target.value)} 
                />
                <Button type="submit" disabled={!username} isLoading={loading} bg="gray">
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && <UserSearchList users={data.searchUsers} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
};

export default ConversationModal;
#include <czmq.h>
/*
*    Prerequisites: 
*    clang or gcc compiler, zmq & czmq libraries & headers.
*
*    Compilation: 
*    
*    clang -o chainlistener chainlistener.c -I/usr/local/include -L/usr/local/lib -lzmq -lczmq
*
*    or:
*
*    gcc -o chainlistener chainlistener.c -I/usr/local/include -L/usr/local/lib -lzmq -lczmq
*
*    Check for available ZMQ publishers by typing "getzmqnotifications" in wallet console.
*
*    Example output: 
*
*    zmqpubrawblock=tcp://127.0.0.1:38332
*    zmqpubrawtx=tcp://127.0.0.1:38333
*    zmqpubhashtx=tcp://127.0.0.1:38334
*    zmqpubhashblock=tcp://127.0.0.1:38335
*
*    Usage example:
*    chainlistener tcp://127.0.0.1:38334 hashtx
*
*/

int main(int argc, char ** argv) {

  char *zmqserver;
  char *topic;

  if (argc < 3) {
    printf("\nUSAGE:\nchainlistener <tcp://localhost:port> <topic>\n\n");
    return 0;
  } else {
    zmqserver = argv[1];
    topic = argv[2];
  }
  
  zsock_t *socket = zsock_new_sub(zmqserver, topic);
  assert(socket);
    
  while(1) {
    zmsg_t *msg;
    int rc = zsock_recv(socket, "m", &msg);
    assert(rc == 0);

    char *header = zmsg_popstr(msg);
    zframe_t *zdata = zmsg_pop(msg);
    unsigned int *no = (unsigned int*)zmsg_popstr(msg);

    char *data = zframe_strhex(zdata);
    int len = zframe_size(zdata);
    printf("Size: %d\n", len);
    printf("Data: %s", data);
    printf("\nNo: %d\n", *no);
    
    free(header);
    free(data);
    free(no);
    free(zdata);
    zmsg_destroy(&msg);
    sleep(1);
  }
  zsock_destroy(&socket);
  return 0;
}

import mongoose from 'mongoose';

const connection = {};

async function connect() {
  // si '.isConnected' existe
  if (connection.isConnected) {
    console.log('already connected !');
    // on sort
    return;
  }
  // si au moins une connection dans mongooe
  if (mongoose.connections.length > 0) {
    // recupére la connection associé à l'instance mongoose
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      // et on sort
      return;
    }
    await mongoose.disconnect();
  }
  // !! ne pas exposer le process de connection
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}

// empéche la deconnection de surchargé le processeur en mode dev
async function disconnect() {
  // si '.isConnected' existe
  if (connection.isConnected) {
    // et que je suis en mode node 'production' et pas dev
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('!!! not disconnected !!!!');
    }
  }
}

const db = { connect, disconnect };

export default db;

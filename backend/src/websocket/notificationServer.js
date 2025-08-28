import { WebSocketServer } from 'ws';
import requestService from '../services/requestService.js';

const clients = [];
let notifying = false;
let notifyInterval = null;

function startNotifyingLoop() {
    if (notifying) return;

    notifying = true;
    console.log('🔁 Iniciando loop de notificação...');

    notifyInterval = setInterval(async () => {
        const hasRequest = await requestService.isThereARequest();

        if (!hasRequest || clients.length === 0) {
            console.log('✅ Parando loop de notificação (sem requests ou clientes)');
            stopNotifyingLoop();
            return;
        }

        sendNotificationToAll('⚠️ Há solicitações pendentes!');
    }, 10000);
}

function stopNotifyingLoop() {
    notifying = false;
    if (notifyInterval) {
        clearInterval(notifyInterval);
        notifyInterval = null;
    }
}

export function setupWebSocket(server) {
    const wss = new WebSocketServer({ server });

    wss.on('connection', async (ws) => {
        clients.push(ws);
        console.log('Novo cliente conectado');

        // Verifica requests pendentes ao conectar
        const hasRequest = await requestService.isThereARequest();
        if (hasRequest) {
            ws.send(JSON.stringify({ message: '⚠️ Há novas solicitações pendentes!' }));
            startNotifyingLoop(); // Começa o loop se não estiver ativo
        }

        ws.on('close', () => {
            const index = clients.indexOf(ws);
            if (index !== -1) clients.splice(index, 1);
            console.log('Cliente desconectado');

            // Se não há mais clientes conectados, parar o loop
            if (clients.length === 0) {
                stopNotifyingLoop();
            }
        });
    });
}

export function sendNotificationToAll(message) {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ message }));
        }
    });
}

// Essa função pode ser chamada no controller quando um request for criado
export async function handleNewRequestNotification() {
    const hasRequest = await requestService.isThereARequest();
    if (hasRequest && clients.length > 0) {
        startNotifyingLoop();
    }
}
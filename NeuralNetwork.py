import os
import torch
from torch import nn
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
import pandas as pd
import torch.utils.data as data_utils
class NeuralNetworkTop:
    def __init__(self,train_data_df,train_events_df,test_data_df,test_events_df,optimizer,batch_size=128,shuffle=False):
        self.device = (
            "cuda"
            if torch.cuda.is_available()
            else "mps"
            if torch.backends.mps.is_available()
            else "cpu"
        )
        self.model = NeuralNetwork().to(self.device)
        self.optimizer=optimizer
        self.batch_size=batch_size
        self.shuffle=shuffle
        self.train_data_tensor = torch.tensor(train_data_df.values)
        self.train_events_tensor = torch.tensor(train_events_df.values)

        self.test_data_tensor=torch.tensor(test_data_df)
        self.test_events_tensor=torch.tensor(test_events_df)

        self.train_dataset=data_utils.TensorDataset(self.train_data_tensor,self.train_events_tensor)
        self.train_dataloader = data_utils.DataLoader(self.train_dataset, batch_size=self.batch_size, shuffle=self.shuffle)

        self.test_dataset=data_utils.TensorDataset(self.test_data_tensor,self.test_events_tensor)
        self.test_dataloader=data_utils.TensorDataset(self.test_dataset, batch_size=self.batch_size, shuffle=self.shuffle)

    def train(self,print_freq=10):
        self.model.train()

        train_loss = 0
        
        for batch_index, (data, target) in enumerate(self.train_dataloader):
            # Move data and target to the same device as the model
            data, target = data.cuda(), target.cuda()  
            
            self.optimizer.zero_grad()
            output = self.model(data)

            loss = torch.nn.functional.nll_loss(output, target)
            loss.backward()

            self.optimizer.step()
            
            train_loss += loss.item() * data.shape[0]
            
            if not (batch_index % print_freq):
                print("Current Loss:", loss)

        return train_loss / len(self.train_dataloader.dataset)

    def test(self):
        self.model.eval()

        test_loss = 0
        correct = 0

        with torch.no_grad():
            for batch_index, (data, target) in enumerate(self.test_dataloader):
                # Move data and target to the same device as the model
                data, target = data.cuda(), target.cuda()
                
                output = self.model(data)
                
                test_loss += torch.nn.functional.nll_loss(output, target, reduction='sum').item()

                pred = output.argmax(dim=1, keepdim=True)
                correct += pred.eq(target.view_as(pred)).sum().item()

        test_loss /= len(self.test_dataloader.dataset)
        test_accuracy = correct / len(self.test_dataloader.dataset)
        
        return test_loss, test_accuracy
    def train_model(self,num_epochs):
        loss_results=[]
        accuracy_results=[]
        for i in range(num_epochs):
            train_loss = self.train()
            test_loss, test_accuracy = self.test()
            
            print(
                f'Epoch: {i + 1} | Train loss: {train_loss:.5f} |',
                f'Test loss: {test_loss:.5f} | Test accuracy: {test_accuracy:.5f}'
            )
            accuracy_results.append([i+1,test_accuracy])
            loss_results.append([i+1,test_loss])
        return accuracy_results,loss_results


class NeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.flatten = nn.Flatten()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(16, 512),
            nn.ReLU(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Linear(512, 6),
        )

    def forward(self, x):
        x = self.flatten(x)
        logits = self.linear_relu_stack(x)
        return logits
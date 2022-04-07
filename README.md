# SimpleSnipet

This is a simple Visual Stdio Code snippet plugin.

Just create a file containing snippets of code, and you can create your own snippets, or snippets that are unique to your project.

# How to use

## 0. Install plugin.

## 1. Create .vscsnipets/ directory
To the workspace route . /vscsnipets directory in the root of the workspace.

<img width="374" alt="スクリーンショット 2022-04-07 15 09 53" src="https://user-images.githubusercontent.com/46161490/162131753-d3f64f7e-50bd-4791-80f8-05a85fcbd153.png">

## 2. Create Snipet file

Create a file in the .vscsnipets/ directory with the prefix as the file name
{prefix}.extension

ex: first.ts  start.c

## 3. Write the snipet code.

Write the code you want to deploy in the file you created.

Ex: start.c

```c:start.c
#include <stdio.h>

void initBoot();
int main(){

  return 0;
}

void initBoot(){
  // your part boot code
  printf("start xxxx part");
}
```

## 4. Write a prefix
Where you want to expand the code. Write a prefix

![Control](https://user-images.githubusercontent.com/46161490/162134650-5d5e1a2b-ccc2-406b-b37a-95d83f06b356.gif)


Compleet!!


This plugin offers the following advantages

1, No need to set snippet code language and prefix. (The file name becomes the prefix)

2, Easy to share snippets with project members. On a per-project basis.

3, Snippets can be created in Visual Stdio Code workspace.


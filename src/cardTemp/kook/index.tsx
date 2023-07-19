export class KookCardTemp {
  static ServerStatusCard(info, s: string) {
    return {
      "type": "card",
      "theme" : "info",
      "size": "lg",
      "modules": [
        {
          "type": "header",
          "text" : {
            "type": "plain-text",
            "content": "Rainbow Six : Siege 服务器状态"
          }
        },
        {
          "type": "section",
          "text" : {
            "type": "plain-text",
            "content": `更新日期: ${s}`
          }
        },
        {
          "type": "section",
          "text" : {
            "type": "kmarkdown",
            "content": info
          },
        }
      ]
    }
  }
}

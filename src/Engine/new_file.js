  getInsertIndex(children, offset) {
      const { px } = this;
      if (children.length) {
        const y = px.getNumber(offset.y);
        if (children.length === 1) {
          return y > parseFloat(children[0].data.style.height) ? 1 : 0;
		 
        }
        let insertIndex;
        const nodeYList = children
          .map(node => parseFloat(node.data.style.height))
          .reduce((n, p, i) => {
            switch (true) {
              case y <= p: {
                insertIndex = i;
                break;
              }
              case y > n && n < p: {
                insertIndex = i + 1;
                break;
              }
              case i === children.length && insertIndex === undefined: {
                insertIndex = i;
              }
            }
            return n + p;
          });
        return insertIndex;
        //console.log("插入", y, nodeYList);
      } else {
        return 0;
      }
	
    }
	
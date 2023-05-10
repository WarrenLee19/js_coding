```js
// 闭包保留了timeout的状态
const debounce = (fn, delay) => {
  let timeout
  return (...param) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    // 返回的函数里用到了外部的变量，保存了该变量的状态
    timeout = setTimeout(() => {
      fn(...param)
    }, delay)
  }
}
```
### react 的 useDebounce
* 返回一个debounceValue，这个值会在delay后改变，这样用到它的地方的依赖，也会有这样的效果
* param变了，debouncedParam 不会立即改变，这样就达到了防抖的效果
* useEffect里的函数每次执行之前，都会清除掉上一次的effect，即执行上一次effect里return的函数

```js
// 返回一个debounceValue，这个值会在delay后改变，这样用到它的地方的依赖，也会有这样的效果
export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => {
      clearTimeout(timeout)
    }
  }, [value, delay])

  return debounceValue
}

// 组件里使用:
// param变了，debouncedParam 不会立即改变，这样就达到了防抖的效果
 const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param,1000)
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async (res) => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [debouncedParam])
```

### 具体实践
注：使用ahooks来完成，props传入Onchange是回调函数
```js
import { Select, Spin, Empty, Alert } from "antd";
import { useDebounce } from "ahooks";
import React, { useState, useEffect,  } from "react";
const notFound = (fetch) => {
  switch (fetch) {
    case -1:
      return null;
    case 0:
      return <Spin size="small" />;
    case 1:
      return <Empty />;
    default:
      return <Alert type="error" message={fetch} banner />;
  }
};
function DebounceSelect({
                          fetchOptions,
                          debounceTimeout = 800,
                          onChange,
                          ...props
                        }) {
  const [fetching, setFetching] = useState(-1); //-1未请求 0 请求中 1 请求结束
  const [options, setOptions] = useState([]);
  const [prevSearchValue, setPrevSearchValue] = useState();
  const [searchValue, setSearchValue] = useState();
  const debouncesearchValue = useDebounce(searchValue, { wait: 1000 });

  useEffect(() => {
    if (debouncesearchValue) {
      if (debouncesearchValue.length < 5) {
        setFetching("请输入不少于5个字的关键词");
        setOptions([]);
        return;
      }
      if (prevSearchValue !== debouncesearchValue) {
        getOptions(debouncesearchValue);
      }
    }
  }, [debouncesearchValue]);

  const getOptions = (value) => {
    setPrevSearchValue(value);
    setOptions([]);
    setFetching(0);
    fetchOptions(value).then((newOptions) => {
      setFetching(1);
      setOptions(newOptions);
    });
  };

  const triggerChange = (v) => {
    const obj = options.find((o) => o.value === v);
    onChange(obj);
    setSearchValue(v);
  };
  const onSearch = (v) => {
    setSearchValue(v);
  };

  const onFocus = () => {
    if (!props.value) {
      setFetching("请输入不少于5个字的关键词");
      setOptions([]);
    } else {
      setFetching(-1);
    }

    setSearchValue(props.value);
  };

  return (
      <Select
          searchValue={searchValue}
          filterOption={false}
          onSearch={onSearch}
          notFoundContent={notFound(fetching)}
          {...props}
          onChange={triggerChange}
          options={options}
          onFocus={onFocus}
      />
  );
}
export default DebounceSelect;

```


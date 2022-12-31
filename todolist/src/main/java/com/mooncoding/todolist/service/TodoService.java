package com.mooncoding.todolist.service;

import com.mooncoding.todolist.model.TodoEntity;
import com.mooncoding.todolist.persistence.TodoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class TodoService {
    @Autowired
    private TodoRepository repository;

    public String testService() {
        // TodoEntity 생성
        TodoEntity entity = TodoEntity.builder().title("My first todo item").build();
        // TodoEntity 저장
        repository.save(entity);
        // TodoEntity 검색
        TodoEntity savedEntity = repository.findById(entity.getId()).get();
        return savedEntity.getTitle();
    }

    public List<TodoEntity> create(final TodoEntity entity) {
        // Validations
        validate(entity);

        repository.save(entity);

        log.info("Entity Id : {} is saved.", entity.getId());

        return repository.findByUserId(entity.getUserId());

    }

    private void validate(final TodoEntity entity) {
        if(entity == null) {
            log.warn("Entity cannot be null.");
            throw new RuntimeException("Entity cannot be null.");
        }

        if(entity.getUserId() == null) {
            log.warn("Unknown user.");
            throw new RuntimeException("Unknown user.");
        }
    }

    public List<TodoEntity> retrieve(final String userId) {
        return repository.findByUserId(userId);
    }

    public List<TodoEntity> update(final TodoEntity entity) {
        // 1. 저장할 엔티티가 유효한지 확인한다.
        validate(entity);

        // 2. 넘겨받은 엔티티 id를 이용해 TodoEntity를 가져온다.
        // 존재하지 않는 엔티티는 업데이트 할 수 없기 때문이다.
        final Optional<TodoEntity> original = repository.findById(entity.getId());

        original.ifPresent(todo -> {
            //3. 반환된 TodoEntity가 존재하면 값을 새 entity의 값으로 덮어 씌운다.
            todo.setTitle(entity.getTitle());
            todo.setDone(entity.isDone());

            //4. db에 새 값을 저장한다.
            repository.save(todo);
        });
//        위와 같은 코드임
//        if(original.isPresent()) {
//            final TodoEntity todo = original.get();
//            todo.setTitle(entity.getTitle());
//            todo.setDone(entity.isDone());
//
//            repository.save(todo);
//        }


        // Retrieve Todo에서 만든 메서드를 이용해 유저의 모든 Todo 리스트를 리턴한다.
        return retrieve(entity.getUserId());
    }

    public List<TodoEntity> delete(final TodoEntity entity) {
        //1. 저장할 엔티티가 유효한지 확인
        validate(entity);

        try {
            //2. 엔티티 삭제
            repository.delete(entity);
        } catch (Exception e) {
            // 3. 익셉션 발생 시 id와 익셉션 로깅
            log.error("error deleteing entity : ", entity.getId(), e);

            // 4. 컨트롤러로 익셉션을 날린다. db 내부 로직을 캡슐화하기 위해 e를 리턴하지 않고 새 익셉션 오브젝트를 리턴한다.
            throw new RuntimeException("error deleting entity : "+ entity.getId());
        }
        // 5. 새 todo리스트를 가져와 리턴한다.
        return retrieve(entity.getUserId());
    }
}

/*
 * Copyright (c) 2018-2019. ‭‭‭‭‭‭‭‭‭‭‭‭[zuoqinggang] www.pingfangushi.com
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

package cn.smallbun.scaffold.manage.service.impl;

import cn.smallbun.scaffold.framework.context.ApplicationContextHelp;
import cn.smallbun.scaffold.framework.mybatis.domain.IdEntity;
import cn.smallbun.scaffold.framework.mybatis.service.BaseServiceImpl;
import cn.smallbun.scaffold.manage.entity.SysGroupEntity;
import cn.smallbun.scaffold.manage.entity.SysUserEntity;
import cn.smallbun.scaffold.manage.enums.GroupStatus;
import cn.smallbun.scaffold.manage.mapper.SysGroupMapper;
import cn.smallbun.scaffold.manage.service.ISysGroupService;
import cn.smallbun.scaffold.manage.service.ISysUserService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.Collection;
import java.util.Objects;

/**
 * <p>
 * 系统机构表 服务实现类
 * </p>
 *
 * @author SanLi Automatic generated
 * Created by qinggang.zuo@gmail.com / 2689170096@qq.com on  2019-05-14
 */
@Service
public class SysGroupServiceImpl extends BaseServiceImpl<SysGroupMapper, SysGroupEntity> implements ISysGroupService {


	/**
	 * 根据ID更新组织机构信息
	 * @param id ID
	 * @param status 状态
	 * @return boolean
	 */
	@Override
	public boolean updateStatusById(String id, GroupStatus status) {
		return update(new LambdaUpdateWrapper<SysGroupEntity>()
				// ID
				.eq(IdEntity::getId, id)
				// 设置装填
				.set(SysGroupEntity::getStatus, status));
	}

	/**
	 * 删除组织
	 * @param idList {@link Collection} id
	 * @return boolean
	 */
	@Override
	public boolean removeByIds(Collection<? extends Serializable> idList) {
		idList.forEach(id -> {
			//查询是否具有关联关系，如有有不能删除
			LambdaQueryWrapper<SysUserEntity> condition = new LambdaQueryWrapper<SysUserEntity>()
					.eq(SysUserEntity::getGroupId, id);
			//查询总数
			int count = ApplicationContextHelp.getBean(ISysUserService.class).count(condition);
			if (count > 0) {
				//查询机构信息
				SysGroupEntity group = getById(id);
				if (!Objects.isNull(group)) {
					//抛出异常
					throw new RuntimeException(group.getName() + "下存在[" + count + "]条记录，请处理后在进行删除操作！");
				}
			}
		});
		return super.removeByIds(idList);
	}
}
